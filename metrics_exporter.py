import os
import sys
import time
import socket
import subprocess
import re

CARBON_HOST = '127.0.0.1'
CARBON_PORT = 2004
INTERVAL = 10  # seconds

def get_portfolio_pods():
    try:
        output = subprocess.check_output("kubectl get pods -o jsonpath=\"{.items[*].metadata.name}\"", shell=True, text=True)
        pods = output.strip().split()
        return [p for p in pods if p.startswith("portfolio-deployment-")]
    except Exception as e:
        print(f"Error getting pods: {e}")
        return []

def get_pod_metric(pod_name, path):
    try:
        cmd = f"kubectl exec {pod_name} -- cat {path}"
        output = subprocess.check_output(cmd, shell=True, text=True, stderr=subprocess.DEVNULL)
        return output.strip()
    except Exception:
        return None

def send_to_graphite(metrics):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.connect((CARBON_HOST, CARBON_PORT))
        for metric, value, timestamp in metrics:
            message = f"{metric} {value} {timestamp}\n"
            sock.sendall(message.encode('ascii'))
            print(f"Sent: {message.strip()}")
        sock.close()
    except Exception as e:
        print(f"Failed to send to Graphite: {e}")

def main():
    print(f"Starting metrics exporter to Graphite at {CARBON_HOST}:{CARBON_PORT}...")
    cpu_history = {}  # pod_name -> (timestamp, usage_usec)
    
    while True:
        pods = get_portfolio_pods()
        if not pods:
            print("No portfolio pods found. Sleeping...")
            time.sleep(INTERVAL)
            continue
            
        current_time = int(time.time())
        metrics_to_send = []
        
        for pod in pods:
            safe_pod_name = pod.replace("-", "_").replace(".", "_")
            
            # Memory metric
            mem_raw = get_pod_metric(pod, "/sys/fs/cgroup/memory.current")
            if mem_raw and mem_raw.isdigit():
                mem_bytes = int(mem_raw)
                metrics_to_send.append((f"portfolio.{safe_pod_name}.memory_bytes", mem_bytes, current_time))
            
            # CPU metric
            cpu_stat = get_pod_metric(pod, "/sys/fs/cgroup/cpu.stat")
            if cpu_stat:
                match = re.search(r"usage_usec\s+(\d+)", cpu_stat)
                if match:
                    usage_usec = int(match.group(1))
                    
                    if pod in cpu_history:
                        prev_time, prev_usage = cpu_history[pod]
                        time_delta = current_time - prev_time
                        if time_delta > 0:
                            usage_delta = usage_usec - prev_usage
                            cpu_percent = (usage_delta / (time_delta * 1000000.0)) * 100.0
                            metrics_to_send.append((f"portfolio.{safe_pod_name}.cpu_percent", cpu_percent, current_time))
                    
                    cpu_history[pod] = (current_time, usage_usec)
        
        if metrics_to_send:
            send_to_graphite(metrics_to_send)
            
        time.sleep(INTERVAL)

if __name__ == "__main__":
    main()
