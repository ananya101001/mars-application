const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div style={styles.progressContainer}>
      {steps.map((step, index) => (
        <div 
          key={index} 
          style={{
            ...styles.progressStep,
            ...(index + 1 === currentStep ? styles.active : {}),
            ...(index + 1 < currentStep ? styles.completed : {})
          }}
        >
          <span style={styles.stepNumber}>
            {index + 1 < currentStep ? '✓' : index + 1}
          </span>
          <span style={styles.stepTitle}>{step.title}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  progressContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "600px",
    margin: "20px auto 30px",
    position: "relative",
    padding: "0 10px",
  },
  progressStep: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 12px",
    margin: "0 8px",
    background: "#f5f5f5",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  stepNumber: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "#666",
    marginBottom: "6px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  stepTitle: {
    fontSize: "13px",
    color: "#666",
    fontWeight: "500",
  },
  active: {
    background: "#4CAF50",
    color: "white",
    boxShadow: "0 4px 8px rgba(76,175,80,0.2)",
    "& > span": {
      color: "white"
    }
  },
  completed: {
    background: "#8bc34a",
    color: "white",
    "& > span": {
      color: "white"
    }
  }
};

export default ProgressIndicator;
