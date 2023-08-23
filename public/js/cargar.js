document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("upload-form");
  uploadForm.addEventListener("submit", handleUpload);

  async function handleUpload(event) {
    event.preventDefault();

    const formData = new FormData(uploadForm);

    try {
      const response = await fetch("/guardar", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert("Error al subir la imagen.");
      }
    } catch (error) {
      console.error(error);
      alert("Error del servidor.");
    }
  }
});
