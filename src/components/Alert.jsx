import Swal from "sweetalert2";
import { useI18nContext } from "../context/i18n-context"; // Assuming you have an i18n context

const SuccessAlert = ({ title, text }) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

const DeleteAlert = ({ title, text, deleteClick, closeClick }) => {
  const { t } = useI18nContext(); // Use translation context

  Swal.fire({
    title: title || t("Delete.deleteTitle"),
    text: text || t("Delete.deleteText"),
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: t("Delete.yes"), // "نعم" or "Yes"
    cancelButtonText: t("Delete.no"),   // "لا" or "No"
  }).then((result) => {
    if (result.isConfirmed) {
      deleteClick();
    } else {
      closeClick();
    }
  });

  return null;
};

const ErrorAlert = ({ title, text, closeClick }) => {
  Swal.fire({
    icon: "error",
    title: title || "Oops...",
    text: text || "Something went wrong!",
  }).then(closeClick());

  return null;
};

export { SuccessAlert, DeleteAlert, ErrorAlert };
