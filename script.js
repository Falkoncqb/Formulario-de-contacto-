// Manejo del formulario
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault()

  const submitBtn = document.getElementById("submitBtn")
  const originalText = submitBtn.textContent

  // Deshabilitar botón y mostrar estado de carga
  submitBtn.disabled = true
  submitBtn.textContent = "ENVIANDO..."

  // Obtener datos del formulario
  const formData = new FormData(this)

  try {
    // Enviar datos al servidor
    const response = await fetch("contact.php", {
      method: "POST",
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      showToastWithWhatsApp(
        "¡Mensaje enviado con éxito!",
        "En 24 horas uno de nuestros agentes se pondrá en contacto contigo, o si quieres hablar ahora:",
      )

      // Limpiar formulario
      this.reset()
    } else {
      // Mostrar error
      showToast("Error", result.message || "Hubo un problema al enviar el mensaje.")
    }
  } catch (error) {
    showToast("Error", "No se pudo conectar con el servidor.")
  } finally {
    // Restaurar botón
    submitBtn.disabled = false
    submitBtn.textContent = originalText
  }
})

function showToastWithWhatsApp(title, message) {
  const toast = document.getElementById("toast")
  const toastTitle = document.getElementById("toastTitle")
  const toastMessage = document.getElementById("toastMessage")
  const whatsappButton = document.getElementById("whatsappButton")

  toastTitle.textContent = title
  toastMessage.textContent = message
  whatsappButton.style.display = "block"

  toast.classList.add("show")

  // Mantener el toast visible por más tiempo (8 segundos) para dar tiempo a leer y hacer clic
  setTimeout(() => {
    toast.classList.remove("show")
    // Ocultar el botón de WhatsApp después de cerrar
    setTimeout(() => {
      whatsappButton.style.display = "none"
    }, 300)
  }, 8000)
}

// Función para mostrar notificaciones toast normales (sin WhatsApp)
function showToast(title, message) {
  const toast = document.getElementById("toast")
  const toastTitle = document.getElementById("toastTitle")
  const toastMessage = document.getElementById("toastMessage")
  const whatsappButton = document.getElementById("whatsappButton")

  toastTitle.textContent = title
  toastMessage.textContent = message
  whatsappButton.style.display = "none"

  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 4000)
}

// Validación en tiempo real
document.getElementById("telefono").addEventListener("input", function (e) {
  // Permitir solo números, espacios y el símbolo +
  this.value = this.value.replace(/[^\d\s+]/g, "")
})
