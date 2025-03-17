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

function toggleMenuDropdown() {
  const btn = $('.onToggleDropdown')

  if (btn && btn.length > 0) {
    btn.each(function (id, item) {
      $(item).click(function () {
        console.log('object')
        $(this).parent().siblings().slideToggle()
        $(this).siblings().toggleClass('active')
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

function checkSidebar() {
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
  const sidebar = document.getElementById('sidebarTranslate')
  const btn = document.getElementById('btnSidebar')
  const btnClose = document.getElementById('btnSidebar-mb')

  if (screen.width < 1280) {
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open')
    })

    btnClose.addEventListener('click', () => {
      sidebar.classList.remove('is-open')
    })
  }
}

// init toggle collapse filter
const collapseFilter = () => {
  const btnCollapse = document.getElementById('collapseFilter')
  const blockCollapse = document.getElementById('toggleCollapseFilter')
  const optinal = document.querySelectorAll('.onOptinal')

  btnCollapse.addEventListener('click', () => {
    optinal.forEach((item) => {
      if (item.style.display === 'none') {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
  })
}

const croppedImage = () => {
  let croppieInstance
  let containerWidth, containerHeight

  if (document.getElementById('croppieImageUpload')) {
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
                  boundary: { width: 410, height: 270 },
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
  }
}

function filterTable() {
  // init range slider
  function priceRangeSlider() {
    // Thiết lập giá trị mặc định
    var minDefault = 0
    var maxDefault = 300000000 // 300 triệu, bạn có thể đổi thành 3000000000 (3 tỉ), ...

    // Khởi tạo Slider
    $('#priceSlider').slider({
      range: true,
      min: 0,
      max: 300000000, // Giới hạn tối đa
      step: 500000, // Bước nhảy, ví dụ: 500k
      values: [minDefault, maxDefault],
      slide: function (event, ui) {
        // Cập nhật hai ô input khi kéo slider
        $('#minPrice').val(ui.values[0])
        $('#maxPrice').val(ui.values[1])
      },
    })

    // Gán giá trị ban đầu cho ô nhập
    $('#minPrice').val($('#priceSlider').slider('values', 0))
    $('#maxPrice').val($('#priceSlider').slider('values', 1))

    // Khi người dùng thay đổi giá trị trong ô input
    $('#minPrice, #maxPrice').on('change', function () {
      var minVal = parseInt($('#minPrice').val(), 10)
      var maxVal = parseInt($('#maxPrice').val(), 10)

      // Kiểm tra nếu người dùng nhập sai, đặt về mặc định
      if (isNaN(minVal)) minVal = 0
      if (isNaN(maxVal)) maxVal = 300000000

      // Ràng buộc minVal không nhỏ hơn 0, maxVal không lớn hơn 300 triệu
      if (minVal < 0) minVal = 0
      if (maxVal > 300000000) maxVal = 300000000

      // Nếu minVal lớn hơn maxVal thì hoán đổi
      if (minVal > maxVal) {
        var temp = maxVal
        maxVal = minVal
        minVal = temp
      }

      // Cập nhật slider
      $('#priceSlider').slider('values', [minVal, maxVal])
    })

    // Nút Đặt lại
    $('#resetButton').click(function () {
      $('#priceSlider').slider('values', [minDefault, maxDefault])
      $('#minPrice').val(minDefault)
      $('#maxPrice').val(maxDefault)
    })

    // Nút Áp dụng
    $('#applyButton').click(function () {
      var minVal = $('#priceSlider').slider('values', 0)
      var maxVal = $('#priceSlider').slider('values', 1)
      alert(
        'Giá từ: ' +
          minVal.toLocaleString() +
          ' VND\nGiá đến: ' +
          maxVal.toLocaleString() +
          ' VND',
      )
    })
  }

  // init select2 khoang gia
  function initPriceSame() {
    // Initialize Select2 on all filter selects
    $('.filter-select').select2({
      minimumResultsForSearch: Infinity, // Hide the search box
      width: '100%',
    })

    // Handle the Khoảng giá dropdown toggle
    $('#price-range-toggle').click(function () {
      // This would typically show a custom dropdown or dialog
      // For demonstration, we'll just log a message
      console.log('Price range dropdown clicked')
      // Here you would normally toggle a custom dropdown component
      // You could add your own code to show a price range selector
    })

    // Handle changes for price sorting
    $('#price-sort').on('change', function () {
      console.log('Price sort changed to:', $(this).val())
      // Add your sorting logic here
    })

    // Handle changes for priority
    $('#priority-sort').on('change', function () {
      console.log('Priority sort changed to:', $(this).val())
      // Add your priority filtering logic here
    })

    $('.group-input .dropdown-item').click(function (e) {
      e.stopPropagation() // Ngừng sự kiện click
    })

    $('.block-selector').each(function (id, el) {
      const name = $(el).attr('id')
      const dataAttr = $(el).data('attr')

      // When "Tất cả" is selected, select all options
      $('#' + name + '.block-selector').on('select2:select', function (e) {
        if (e.params.data.id === 'all') {
          $('#' + name + '.block-selector option').prop('selected', true)
          $('#' + name + '.block-selector').trigger('change')
        }
      })

      // When "Tất cả" is unselected, unselect all options
      $('#' + name + '.block-selector').on('select2:unselect', function (e) {
        if (e.params.data.id === 'all') {
          $('#' + name + '.block-selector option').prop('selected', false)
          $('#' + name + '.block-selector').trigger('change')
        }
      })
    })

    // Update checkboxes when dropdown opens
    $('#block-selector').on('select2:open', function () {
      setTimeout(function () {
        updateCheckboxes()
      }, 0)
    })
  }

  // init select2
  function initFieldSelect2() {
    $('.block-selector.filter').select2({
      placeholder: 'Chọn khoảng giá',
      minimumResultsForSearch: Infinity,
      allowClear: true,
    })

    $('.block-selector').each(function (id, el) {
      const name = $(el).attr('id')
      const dataAttr = $(el).data('attr')

      // Initialize Select2
      $('#' + name + '.block-selector').select2({
        placeholder: dataAttr,
        minimumResultsForSearch: Infinity,
        closeOnSelect: false,
        // allowClear: true,
        templateResult: formatOption,
        templateSelection: formatSelection,
      })
    })

    $('.block-selector-admin').each(function (id, el) {
      const name = $(el).attr('id')
      const dataAttr = $(el).data('attr')

      // Initialize Select2
      $(el).select2({
        placeholder: dataAttr,
        minimumResultsForSearch: Infinity,
        closeOnSelect: false,
        // allowClear: true,
        templateResult: formatOption,
        templateSelection: formatSelection,
      })
    })

    $('#filters').select2({
      placeholder: dataAttr,
      minimumResultsForSearch: Infinity,
      closeOnSelect: false,
      // allowClear: true,
      templateResult: formatOption,
      templateSelection: formatSelection,
    })
  }

  // Format each option to include a checkbox
  function formatOption(option) {
    if (!option.id) {
      return option.text
    }

    // Check if this option is selected
    var isSelected = $(option.element).prop('selected')
    var selectedClass = isSelected ? 'option-selected' : ''

    var $option = $(
      '<div class="checkbox-container ' +
        selectedClass +
        '">' +
        '<span class="checkbox"></span>' +
        '<span>' +
        option.text +
        '</span>' +
        '</div>',
    )

    return $option
  }

  // Format the selected options
  function formatSelection(option) {
    return option.text
  }

  // Update checkboxes to reflect current selection state
  function updateCheckboxes() {
    var selectedValues = $('.block-selector').val() || []

    $('.select2-results__option').each(function () {
      var optionId = $(this).data('select2-id')
      if (optionId) {
        // Extract the actual value from the select2-id
        var value = optionId.replace('block-selector-', '')

        if (selectedValues.includes(value)) {
          $(this).find('.checkbox-container').addClass('option-selected')
        } else {
          $(this).find('.checkbox-container').removeClass('option-selected')
        }
      }
    })
  }

  priceRangeSlider()
  initPriceSame()
  initFieldSelect2()
}

function toggleDropdownFilter() {
  const btn = document.getElementById('btnFilters')
  const dropdown = document.getElementById('dropdownFilters')

  btn.addEventListener('click', () => {
    console.log('object')
    if (dropdown.style.display == 'none') {
      dropdown.style.display = 'block'
    } else {
      dropdown.style.display = 'none'
    }
  })
}

window.addEventListener('load', () => {
  inputTogglePassword()
  checkVerifyOTP()
  sidebarMobile()
  croppedImage()
  checkSidebar()
  toggleMenuDropdown()
  toggleDropdownFilter()
  filterTable()
})
