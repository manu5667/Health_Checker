#!/bin/sh

echo "🧹 Starting cleanup of unhealthy pods..."

NAMESPACES="health-checker-db health-checker-backend monitoring"

for ns in $NAMESPACES; do
  echo "🔍 Checking namespace: $ns"

  # Delete CrashLoopBackOff pods
  for pod in $(kubectl get pods -n $ns --field-selector=status.phase=Running --no-headers | awk '$3=="CrashLoopBackOff" {print $1}'); do
    echo "🗑️ Deleting pod in CrashLoopBackOff: $pod (ns: $ns)"
    kubectl delete pod $pod -n $ns
  done

  # Delete Evicted pods
  for pod in $(kubectl get pods -n $ns --field-selector=status.phase=Failed --no-headers | grep Evicted | awk '{print $1}'); do
    echo "🗑️ Deleting evicted pod: $pod (ns: $ns)"
    kubectl delete pod $pod -n $ns
  done
done

echo "✅ Cleanup completed."
