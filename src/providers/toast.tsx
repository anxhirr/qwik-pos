const getAlert = (type: string, message: string) =>
  `
    <div class="alert alert-${type}">
      <span>${message}</span>
    </div>
`;

const createToast = (
  type: string = "success",
  message: string = "Message sent successfully.",
  position: string = "start",
) => {
  const toast = document.querySelector(`.toast-${position}`);

  // stack on top of each other
  if (toast) return (toast.innerHTML += getAlert(type, message));

  const toastContainer = document.createElement("div");
  toastContainer.className = `toast toast-${position}`;
  toastContainer.innerHTML = getAlert(type, message);
  document.body.appendChild(toastContainer);
};

export const successToast = (message: string, position?: string) =>
  createToast("success", message, position);

export const errorToast = (message: string, position?: string) =>
  createToast("error", message, position);

export const infoToast = (message: string, position?: string) =>
  createToast("info", message, position);
