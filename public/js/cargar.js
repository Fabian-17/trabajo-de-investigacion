document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.querySelector("#upload-form");
  
    uploadForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = new FormData(uploadForm);
  
      try {
        const response = await fetch("/cargar", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "Imagen subida exitosamente",
            text: "La imagen se ha subido correctamente.",
          });
          uploadForm.reset();
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error al subir la imagen",
            text: "Ocurrió un error al intentar subir la imagen.",
          });
        }
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al subir la imagen",
          text: "Ocurrió un error al intentar subir la imagen.",
        });
      }
    });
  });
  