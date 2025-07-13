## 📖 Project Overview

Manually managing Kubernetes clusters is time-consuming and prone to human error, particularly for small DevOps teams overseeing production-scale environments. This project implements an automated health-checking and self-healing system that continuously monitors cluster health, detects faults, and takes corrective actions without requiring human intervention. It improves system reliability, optimises resource utilisation, and provides real-time alerts and visual insights.

## 🎯 Project Objectives

* Continuously monitor the health of nodes and pods.
* Trigger automatic remediation of failed workloads.
* Perform horizontal pod autoscaling and basic node balancing.
* Deliver real-time notifications to DevOps via Slack.
* Present health and performance insights on a user-friendly dashboard.

---

## 🧱 Architecture Diagram

![ChatGPT Image Jun 1, 2025, 06_19_57 AM](https://github.com/user-attachments/assets/d0df8411-6647-4de5-a2c0-458f84905a0b)


**Components**:

* **Kubernetes Cluster**: Core orchestration layer hosting the workloads.
* **Prometheus**: Collects node and pod metrics.
* **Grafana**: Visualizes performance dashboards.
* **Alertmanager**: Handles alert routing to Slack.
* **Slack**: Notifies DevOps of issues and recoveries.
* **Self-Healing Scripts**: Runs CronJobs to auto-recover unhealthy pods.

---

## 🗂 Git Repository Structure

```
CapstoneProject-k8s-health-checker/
├── backend/                     # Source code for backend microservices
│   ├── authService/            # Auth microservice (login, register, tokens)
│   ├── companyService/         # Company profile service
│   ├── userService/            # User profile service
│   └── README.md               # Description of backend microservices
│
├── k8s/                        # Kubernetes deployment manifests
│   ├── backend/                # K8s configs for backend services
│   ├── database/               # MongoDB deployment and PVC configs
│   ├── messaging/              # Kafka/Redis configs (if applicable)
│   ├── monitoring-setup/       # Prometheus, Grafana, Alertmanager setup
│   └── self-healing/           # Pod health checks and CronJob scripts
│
├── .gitignore                  # Files and directories to be ignored by Git
├── LICENSE                     # License information
└── README.md                   # Main documentation file for the project
```

---

## 📝 Sprint-wise Execution Report

### ✅ Sprint 1 – Project Setup and Cluster Access

**🏷️ Sprint Goals**

* Set up Git repository with structured project layout
* Install and validate access to a Kubernetes cluster
* Configure Prometheus for metric collection

**⚙️ Steps Performed**

1. Created GitHub repository and added directory structure
2. Installed Kubernetes using `kubeadm` on AWS EC2
3. Accessed cluster using `kubectl get nodes`
4. Installed Prometheus using Helm:

   ```bash
   helm install prometheus prometheus-community/kube-prometheus-stack
   ```
5. Verified Prometheus UI using port-forwarding

**📸 Screenshots**

![Screenshot 2025-05-17 001944](https://github.com/user-attachments/assets/118db9e3-6114-43bc-a3cc-07b0272641d5)

![Screenshot 2025-05-17 003402](https://github.com/user-attachments/assets/62d4c278-e4d0-46e6-a077-c0b486009b4a)

![Screenshot 2025-05-31 234456](https://github.com/user-attachments/assets/a80b9ad7-d602-4e37-a0f5-bf0273b250e8)

*Application is runnig 

![Screenshot 2025-05-28 200943](https://github.com/user-attachments/assets/eaec46d0-c22c-4fbd-860a-45e363ca4390)

![Screenshot 2025-05-28 201234](https://github.com/user-attachments/assets/3c4a2220-2528-4b01-81aa-d7d93499a78b)



**📤 Deliverables**

* ✅ Cluster ready and reachable via `kubectl`
* ✅ Prometheus working and scraping metrics

---
### ✅ Sprint 2 – Health Monitoring Module

**🏷️ Sprint Goals**

* Monitor node and pod health using custom scripts
* Add Kubernetes Liveness and Readiness probes to ensure workload stability

**⚙️ Steps Performed**

1. Developed Python scripts using Kubernetes API client
2. Implemented Liveness and Readiness probes in backend deployment YAMLs:

   ```yaml
   livenessProbe:
     httpGet:
       path: /health
       port: 5000
     initialDelaySeconds: 10
     periodSeconds: 5

   readinessProbe:
     httpGet:
       path: /ready
       port: 5000
     initialDelaySeconds: 5
     periodSeconds: 5
   ```
3. Deployed updated backend services
4. Verified pod readiness and liveness in `kubectl` and Prometheus

**📸 Screenshots**

* Health check script output
  
![Screenshot 2025-05-29 144947](https://github.com/user-attachments/assets/6badc0ba-e9aa-4d53-b95d-3d01574eae50)

![Screenshot 2025-05-29 170245](https://github.com/user-attachments/assets/fbb6090d-769d-4c33-bea2-85dc5e94145c)

![Screenshot 2025-05-29 170259](https://github.com/user-attachments/assets/47672220-d5bb-4df6-abaa-8b9029d7407d)

![Screenshot 2025-05-29 170359](https://github.com/user-attachments/assets/669e1a4f-682f-461a-8549-f04fc847dbbe)

![Screenshot 2025-05-29 170413](https://github.com/user-attachments/assets/72b3ad6f-b0c0-4a94-9a60-dccb93d2fd30)



**📤 Deliverables**

* ✅ Liveness and Readiness probes added to backend deployments
* ✅ Health monitoring script verified

---

### ✅ Sprint 3 – Self-Healing Mechanisms (Pod Recovery)

**🏷️ Sprint Goals**

* Detect and remove `CrashLoopBackOff` and `Evicted` pods automatically
* Deploy recovery script as a CronJob in Kubernetes
* Log actions for audit trail

**⚙️ Steps Performed**

1. Created a cronjob to delete failed pods:
   
![image](https://github.com/user-attachments/assets/000c3364-2c93-4ff5-9181-9868844d9c25)

2. Created CronJob YAML manifest to run script every 5 mins
3. Verified logs using `kubectl logs` and validated pod recovery

**📸 Screenshots**

* CronJob
  
  ![Screenshot 2025-06-01 055059](https://github.com/user-attachments/assets/9e985dab-10b3-49f3-8a19-93b00339789d)

* Recovery logs
  
  ![Screenshot 2025-05-27 235100](https://github.com/user-attachments/assets/3d3b93d9-070f-4551-b727-fbe566a916d6)
  
  ![Screenshot 2025-05-27 235126](https://github.com/user-attachments/assets/e6049211-c5bd-4c71-93d9-ce57632de448)


**📤 Deliverables**

* ✅ CronJob successfully deployed and running
* ✅ Failed pods removed and rescheduled automatically
* ✅ Logs available for all recovery actions

---

### ✅ Sprint 4 – Advanced Self-Healing and Autoscaling

**🏷️ Sprint Goals**

* Enable Horizontal Pod Autoscaling (HPA) for backend services
* Simulate load to test autoscaling
* Apply CPU/memory resource limits
* Observe scaling behavior using Grafana and CLI

**⚙️ Steps Performed**

1. Enabled metrics-server in cluster
2. Applied HPA configuration:

   ```yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: health-checker-auth-hpa
     namespace: health-checker-backend
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: health-checker-auth
     minReplicas: 1
     maxReplicas: 5
     metrics:
       - type: Resource
         resource:
           name: cpu
           target:
             type: Utilization
             averageUtilization: 50
   ```
3. Used BusyBox to simulate load
4. Monitored scaling using:

   ```bash
   kubectl get hpa -n health-checker-backend --watch
   ```

**📸 Screenshots**

* HPA YAML
  
  ![Screenshot 2025-06-01 055458](https://github.com/user-attachments/assets/ca61441a-1e41-4b8a-b3fd-e350561d0327)

* CLI watch output
  
  ![Screenshot 2025-05-30 181221](https://github.com/user-attachments/assets/e1c3c298-8b7c-44de-b33b-20735868d1f1)
  ![Screenshot 2025-05-30 182835](https://github.com/user-attachments/assets/857fe62a-d371-4367-aa0b-74cb6bf3e090)


**📤 Deliverables**

* ✅ All backend services autoscaled based on CPU
* ✅ Scaling verified with load test
* ✅ Resource limits set in deployment specs

---

### ✅ Sprint 5 – Alerting and Notification Integration

**🏷️ Sprint Goals**

* Configure Alertmanager to send Slack alerts
* Define alert rules for pod crash, CPU usage, etc.
* Validate alert delivery

**⚙️ Steps Performed**

1. Generated Slack webhook URL
2. Updated Alertmanager config with Slack receiver
3. Added alert rules for pod unavailability and resource spikes
4. Simulated failures to trigger alerts
5. Verified alerts in Slack

**📸Screenshots**

* Alertmanager config
  
  ![Screenshot 2025-05-31 201240](https://github.com/user-attachments/assets/039a33b3-5558-4e08-82a9-2ca9545fab62)

* Prometheus alerts
  
  ![Screenshot 2025-05-31 201312](https://github.com/user-attachments/assets/b8ed23d0-f6c5-4bd3-999b-487adda060d1)

* Alert Notification
  
![Screenshot 2025-05-31 201341](https://github.com/user-attachments/assets/8544c582-9923-463c-8fc5-fef5f03e9f26)

* Slack messages
  
  ![Screenshot 2025-05-31 205017](https://github.com/user-attachments/assets/afbacf39-d75e-4d6d-9970-c12368c7c822)


**📤 Deliverables**

* ✅ Slack successfully integrated with Alertmanager
* ✅ Real-time alerts received and acknowledged

---

### ✅ Sprint 6 – Web Dashboard and Final Documentation

**🏷️ Sprint Goals**

* Design Grafana dashboard with cluster-wide metrics
* Collect screenshots and finalize project report
* Conduct full system validation

**⚙️ Steps Performed**

1. Created custom Grafana panels for:

   * Node health
   * Pod status
   * Resource usage
   * Alerts & replicas
2. Compiled project documentation and images
3. Validated all sprints end-to-end

**📸 Screenshots**

* Prometheus UI (Which shoes all nodes and pods running for auth, user and company service)

  ![Screenshot 2025-06-08 144641](https://github.com/user-attachments/assets/229e88f0-b4e0-49c2-84e0-e78c8ec9436c)

  ![Screenshot 2025-06-08 144658](https://github.com/user-attachments/assets/f2e36e5b-5611-4c49-a007-8fb374ce7109)


* Grafana dashboard which showes all service running in single dashboard
  
  ![image](https://github.com/user-attachments/assets/7aaf0c0d-1784-4660-8fde-b6704049813d)


![Screenshot 2025-05-29 200554](https://github.com/user-attachments/assets/fb6522a6-0a9f-4361-9283-b856212e13fc)


**📤 Deliverables**

* ✅ Dashboard ready for stakeholder use
* ✅ Documentation complete
* ✅ All objectives verified

---
## 🚧 Project Challenges

During the implementation of the *Kubernetes Cluster Health Checker and AutoHealing* project, multiple technical, architectural, and operational challenges were encountered. These challenges spanned across all stages of the project, from initial setup to advanced monitoring and notification integration. The following summarizes the key difficulties faced:

- **Kubernetes Cluster Setup**: Configuring a kubeadm-based Kubernetes cluster on AWS EC2 instances required careful network setup, port access configuration, and ensuring persistent cluster availability through reboots and restarts.

- **Prometheus Configuration Complexity**: Developing a single, well-structured `prometheus.yml` that included all necessary Kubernetes scrape jobs (e.g., nodes, pods, kubelet, apiserver, cadvisor) was both time-consuming and error-prone. Ensuring Prometheus consistently discovered and scraped targets was a recurring challenge.

- **Monitoring Stack Integration**: Coordinating the integration of Prometheus, Grafana, and Alertmanager required aligning services, persistent volumes, and service discovery. Ensuring Grafana dashboards visualized relevant metrics from all configured sources added additional complexity.

- **Pod Health Management**: Designing self-healing logic for detecting and recovering from unhealthy pod states (e.g., `CrashLoopBackOff`, `Evicted`, `ImagePullBackOff`) required custom health-check scripts and CronJobs. Ensuring safe and repeatable cleanup operations without impacting healthy workloads was a key concern.

- **Autoscaling in Limited Environments**: Simulating CPU/memory stress to validate the behavior of the Horizontal Pod Autoscaler (HPA) proved challenging within a single-node Minikube cluster. Limited resources constrained accurate testing of node scaling and workload balancing.

- **Alerting and Notification Integration**: Integrating Slack with Alertmanager via webhook configurations demanded secure token handling and robust alert routing logic. Defining meaningful, non-noisy alert rules for both infrastructure and application health required fine-tuning and multiple iterations.

- **Testing and Validation**: Consistently simulating failure conditions (e.g., pod crashes, high CPU) and validating self-healing and alerting behavior demanded extensive testing. Identifying edge cases and ensuring complete cluster observability during these scenarios was critical.

- **Documentation and Consistency**: Maintaining a well-organized directory structure, consistent file naming conventions, and comprehensive sprint-wise documentation with supporting screenshots was essential, yet time-intensive. Ensuring reproducibility of all steps for review and handoff posed an additional challenge.

These challenges were addressed iteratively, and each provided valuable learning opportunities in real-world Kubernetes operations, DevOps tooling, and automation best practices.
