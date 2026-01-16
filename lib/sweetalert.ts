import Swal from "sweetalert2"

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

export const showSuccess = (title: string, text?: string) => {
  return Toast.fire({
    icon: "success",
    title,
    text,
  })
}

export const showError = (title: string, text?: string) => {
  return Toast.fire({
    icon: "error",
    title,
    text,
  })
}

export const showInfo = (title: string, text?: string) => {
  return Toast.fire({
    icon: "info",
    title,
    text,
  })
}

export const showConfirm = async (title: string, text: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  })
  return result.isConfirmed
}
