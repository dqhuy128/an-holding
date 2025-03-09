const inputTogglePassword = () => {
  const togglePassword = document.querySelectorAll('.inputTogglePassword')

  // Kiểm tra xem có tồn tại element hay k
  if (togglePassword) {
    // Lặp qua từng button và thêm sự kiện click
    togglePassword.forEach((button) => {
      // Thêm sự kiện 'click' cho nút toggle
      button.addEventListener('click', () => {
        // Kiểm tra xem các input hiện tại đang có type là 'password' hay 'text'
        if (button.previousElementSibling.type === 'password') {
          button.previousElementSibling.type = 'text'
          button.classList.add('eye-toggle-show')
          button.classList.remove('eye-toggle-hide')
        } else {
          button.previousElementSibling.type = 'password'
          button.classList.remove('eye-toggle-show')
          button.classList.add('eye-toggle-hide')
        }
      })
    })
  }
}

// Hàm để tự động di chuyển giữa các ô OTP khi người dùng nhập

const checkVerifyOTP = () => {
  let otpInputs = document.querySelectorAll('#verifyOTP .otp-input')
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus()
      }
    })

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
        otpInputs[index - 1].focus()
      }
    })
  })
}

// Hàm gửi lại mã OTP
const resendOtp = () => {
  alert('Mã OTP đã được gửi lại!')
}

// Hàm xác nhận mã OTP
const verifyOtp = () => {
  let otpInputs = document.querySelectorAll('#verifyOTP .otp-input')
  let otp = ''
  otpInputs.forEach((input) => {
    otp += input.value
  })

  if (otp.length === 6) {
    alert(`Mã OTP bạn nhập là: ${otp}`)
    // Logic kiểm tra mã OTP có đúng không sẽ được thêm ở đây
  } else {
    alert('Vui lòng nhập đầy đủ mã OTP!')
  }
}

const checkSidebar = () => {
  const sidebar = document.getElementById('Sidebar')
  const root = document.getElementById('RootLayout')
  const pad = 24

  if (sidebar && screen.width >= 1280) {
    const sidebarWidth = sidebar.clientWidth
    const rootTotal = sidebarWidth + pad

    root.style.marginLeft = rootTotal + 'px'
  }
}

const sidebarMobile = () => {
  if (screen.width < 1280) {
    const sidebar = document.getElementById('sidebarTranslate')
    const btn = document.getElementById('btnSidebar')

    btn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open')
      console.log(sidebar)
    })
  }
}

// init toggle collapse filter
const collapseFilter = () => {
  const btnCollapse = document.getElementById('collapseFilter')
  const blockCollapse = document.getElementById('toggleCollapseFilter')

  btnCollapse.addEventListener('click', () => {
    if (blockCollapse.style.display === 'none') {
      blockCollapse.style.display = 'block'
    } else {
      blockCollapse.style.display = 'none'
    }
  })
}

window.addEventListener('load', () => {
  inputTogglePassword()
  checkVerifyOTP()
  checkSidebar()
  sidebarMobile()

  // setInterval(() => {
  //   console.clear()
  // }, 1)
  // imageCroppie()

  let croppieInstance
  let containerWidth, containerHeight // Biến lưu kích thước của khung chứa ảnh (container)

  // Xử lý khi người dùng chọn ảnh
  document
    .getElementById('croppieImageUpload')
    .addEventListener('change', function (event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = function (e) {
          const img = new Image()
          img.onload = function () {
            // Lấy kích thước của container chứa Croppie
            const croppieContainer =
              document.getElementById('croppie-container')
            containerWidth = croppieContainer.offsetWidth // Chiều rộng của khung chứa ảnh
            containerHeight = croppieContainer.offsetHeight // Chiều cao của khung chứa ảnh

            console.log('Container width: ' + containerWidth + 'px')
            console.log('Container height: ' + containerHeight + 'px')

            // Khởi tạo Croppie khi ảnh đã được tải lên
            if (croppieInstance) {
              croppieInstance.destroy()
            }

            // Hiển thị ảnh vào Croppie
            croppieInstance = new Croppie(
              document.getElementById('croppie-container'),
              {
                enableExif: true,
                viewport: { width: 270, height: 270, type: 'circle' },
                boundary: { width: 540, height: 540 },
                showZoomer: true,
                enableOrientation: true,
              },
            )

            // Bind ảnh vào Croppie
            croppieInstance.bind({
              url: e.target.result,
              orientation: 1,
            })

            // Mở modal khi ảnh đã sẵn sàng
            const myModal = new bootstrap.Modal(
              document.getElementById('modalCroppie'),
            )
            myModal.show()
          }
          img.src = e.target.result
        }

        reader.readAsDataURL(file)
      }
    })
})
