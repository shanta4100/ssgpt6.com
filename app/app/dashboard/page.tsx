type WaterData = {
  device: string;
  status: string;
  quality: number;
  signal: string;
  timestamp: string;
};

async function getWaterData(): Promise<WaterData> {
  const res = await fetch("http://localhost:3000/api/water", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load water data");
  }

  return res.json();
}

export default async function DashboardPage() {
  const data = await getWaterData();

  const statusColor =
    data.status === "SAFE" ? "#16a34a" : data.status === "RISK" ? "#f59e0b" : "#dc2626";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#081225",
        color: "white",
        padding: "24px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#0f1b34",
          border: "1px solid #22365f",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            marginTop: 0,
            fontSize: "32px",
            color: "#facc15",
          }}
        >
          SSGPT6 Black Box Dashboard
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: "24px" }}>
          Live device monitoring panel
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "#142445",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px" }}>Device ID</div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>{data.device}</div>
          </div>

          <div
            style={{
              background: "#142445",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px" }}>Signal</div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>{data.signal}</div>
          </div>

          <div
            style={{
              background: "#142445",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px" }}>Water Status</div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: statusColor,
              }}
            >
              {data.status}
            </div>
          </div>

          <div
            style={{
              background: "#142445",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ color: "#94a3b8", fontSize: "14px" }}>Quality Score</div>
            <div style={{ fontSize: "22px", fontWeight: "bold" }}>{data.quality}%</div>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            background: "#142445",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>Last Update</div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            {new Date(data.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </main>
  );
}