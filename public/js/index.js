document.addEventListener("DOMContentLoaded", async () => {
    const imageTable = document.getElementById("image-table");
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    const editForm = document.getElementById("edit-form");
    const editNombreInput = document.getElementById("editNombre");
  
    try {
      const response = await fetch("/");
      const images = await response.json();
  
      images.forEach((image) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${image.id}</td>
          <td>${image.nombre_original}</td>
          <td>
            <button class="btn btn-primary btn-edit" data-id="${image.id}"><i class="fas fa-edit"></i> Editar</button>
            <button class="btn btn-danger btn-delete" data-id="${image.id}"><i class="fas fa-trash-alt"></i> Eliminar</button>
          </td>
        `;
  
        imageTable.appendChild(row);
      });
  
      // aqui se agregan los eventos de clic a los botones de editar y eliminar
      imageTable.addEventListener("click", handleButtonClick);
    } catch (error) {
      console.error(error);
    }
  });
  
  function handleButtonClick(event) {
    const target = event.target;
  
    if (target.classList.contains("btn-edit")) {
        const imageId = target.getAttribute("data-id");
        const image = images.find(img => img.id === parseInt(imageId));
  
        if (image) {
          editNombreInput.value = image.nombre_original; // Mostrar nombre actual en el formulario
          editForm.addEventListener("submit", async (e) => {
            e.preventDefault();
  
            const nuevoNombre = editNombreInput.value;
            await updateImage(imageId, nuevoNombre);
            editModal.hide();
          });
  
          
        editModal.show();
        }
    } else if (target.classList.contains("btn-delete")) {
      const imageId = target.getAttribute("data-id");
      deleteImage(imageId);
    }
  }

  
  async function updateImage(imageId, nuevoNombre) {
    try {
      const response = await fetch(`/${imageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nuevoNombre }),
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Imagen actualizada",
          text: "La imagen se ha actualizado correctamente.",
        });
        location.reload(); // Recargar la página después de actualizar
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error al actualizar la imagen",
          text: "Ocurrió un error al intentar actualizar la imagen.",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Error al actualizar la imagen",
        text: "Ocurrió un error al intentar actualizar la imagen.",
      });
    }
  }


  
  async function deleteImage(imageId) {
    try {
      const response = await fetch(`/${imageId}`, {
        method: "DELETE"
      });
  
      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Imagen eliminada",
          text: "La imagen se ha eliminado correctamente.",
        });
        location.reload(); // Recargar la página después de eliminar
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error al eliminar la imagen",
          text: "Ocurrió un error al intentar eliminar la imagen.",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Error al eliminar la imagen",
        text: "Ocurrió un error al intentar eliminar la imagen.",
      });
    }
  }
 