import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Erro na aplicação:", error);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div style={{
          padding: 24,
          fontFamily: "sans-serif",
          maxWidth: 560,
          margin: "40px auto",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 8,
        }}>
          <h1 style={{ color: "#b91c1c", marginBottom: 8 }}>Algo deu errado</h1>
          <p style={{ color: "#991b1b", marginBottom: 16 }}>
            {this.state.error.message}
          </p>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
            Abra o Console do navegador (F12 → Console) para mais detalhes.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: "8px 16px",
              background: "#b91c1c",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Tentar de novo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
