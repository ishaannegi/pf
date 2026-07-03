$CarbonHost = "127.0.0.1"
$CarbonPort = 2004
$Interval = 10

Write-Host "Starting PowerShell Metrics Exporter to Graphite at ${CarbonHost}:${CarbonPort}..."

$CpuHistory = @{}

while ($true) {
    $podsOutput = kubectl get pods -o jsonpath="{.items[*].metadata.name}"
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrEmpty($podsOutput)) {
        Write-Host "No portfolio pods found or kubectl error. Sleeping..."
        Start-Sleep -Seconds $Interval
        continue
    }

    $pods = $podsOutput.Split(" ", [System.StringSplitOptions]::RemoveEmptyEntries) | Where-Object { $_ -like "portfolio-deployment-*" }
    if ($pods.Count -eq 0) {
        Write-Host "No portfolio pods found. Sleeping..."
        Start-Sleep -Seconds $Interval
        continue
    }

    $currentTime = [int](Get-Date -UFormat %s)
    $metrics = @()

    foreach ($pod in $pods) {
        $safePodName = $pod.Replace("-", "_").Replace(".", "_")

        # Memory Metric
        $memRaw = kubectl exec $pod -- cat /sys/fs/cgroup/memory.current 2>$null
        if ($LASTEXITCODE -eq 0 -and $memRaw -match "^\d+$") {
            $memBytes = [long]$memRaw
            $metrics += "portfolio.$safePodName.memory_bytes $memBytes $currentTime"
        }

        # CPU Metric
        $cpuStat = kubectl exec $pod -- cat /sys/fs/cgroup/cpu.stat 2>$null
        if ($LASTEXITCODE -eq 0 -and ![string]::IsNullOrEmpty($cpuStat)) {
            if ($cpuStat -match "usage_usec\s+(\d+)") {
                $usageUsec = [long]$Matches[1]

                if ($CpuHistory.Contains($pod)) {
                    $prev = $CpuHistory[$pod]
                    $timeDelta = $currentTime - $prev.time
                    if ($timeDelta -gt 0) {
                        $usageDelta = $usageUsec - $prev.usage
                        $cpuPercent = ($usageDelta / ($timeDelta * 1000000.0)) * 100.0
                        $metrics += "portfolio.$safePodName.cpu_percent $cpuPercent $currentTime"
                    }
                }

                $CpuHistory[$pod] = @{ time = $currentTime; usage = $usageUsec }
            }
        }
    }

    if ($metrics.Count -gt 0) {
        try {
            $socket = New-Object System.Net.Sockets.TcpClient($CarbonHost, $CarbonPort)
            $writer = New-Object System.IO.StreamWriter($socket.GetStream())
            foreach ($metric in $metrics) {
                $writer.WriteLine($metric)
                Write-Host "Sent: $metric"
            }
            $writer.Flush()
            $writer.Close()
            $socket.Close()
        }
        catch {
            Write-Host "Failed to send metrics to Graphite: $_"
        }
    }

    Start-Sleep -Seconds $Interval
}
