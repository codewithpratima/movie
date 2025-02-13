const dataTableStyles = {
  table: {
    className: "min-w-full divide-y divide-gray-200 bg-white",
    textAlign: "left",
  },
  header: {
    className: "bg-gray-100",
    style: {
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      borderTopColor: "rgba(0, 0, 0, 0.1)",
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  headRow: {
    style: {
      borderTopWidth: "1px",
      borderBottomWidth: "1px",
      borderTopColor: "rgba(0, 0, 0, 0.1)",
      borderBottomColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  headCells: {
    style: {
      paddingLeft: "0.35rem",
      paddingRight: "0.35rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      fontWeight: "bold",
      lineHeight: "1.25rem",
      letterSpacing: "0.05em",
      textTransform: "capitalize",
      color: "#273342",
      textAlign: "left",
      position: "sticky",
      top: 0,
      width: "113px",
      backgroundColor: "#f4f4f4",
      zIndex: 1,
    },
  },
  rows: {
    style: {
      cursor: "pointer", // Make the entire row clickable
      transition: "background-color 0.3s ease",
    },
  },
  cells: {
    style: {
      paddingLeft: "0.35rem",
      paddingRight: "0.35rem",
      width: "113px",
      paddingTop: "0.35rem",
      paddingBottom: "0.35rem",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "#273342",
      textAlign: "left",
    },
  },
  pagination: {
    style: {
      borderTopWidth: "1px",
      borderTopColor: "rgba(0, 0, 0, 0.1)",
    },
    pageButtonsStyle: {
      padding: "0.375rem 0.5rem",
      borderRadius: "0.375rem",
      background: "#E5E7EB",
      color: "#4B5563",
      marginLeft: "0.25rem",
      marginRight: "0.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    activePageButtonStyle: {
      background: "#6B7280",
      color: "#FFFFFF",
    },
    disabledPageButtonStyle: {
      background: "transparent",
      color: "#4B5563",
      cursor: "not-allowed",
    },
    pageInfoStyle: {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "#6B7280",
      marginLeft: "0.5rem",
    },
  },
  paginationButtonIcon: {
    style: {
      marginLeft: "0.25rem",
      width: "1rem",
      height: "1rem",
      fill: "#4B5563",
    },
  },
};

export default dataTableStyles;
