function inputTogglePassword() {
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

  btn.each(function (id, item) {
    const hasSub = $(item).parent().siblings().hasClass('sub')

    if (hasSub) {
      $(item).click(function (e) {
        e.preventDefault()

        $(this).parent().siblings().slideToggle()
        $(this).toggleClass('active')
      })
    }
  })
}

// Hàm để tự động di chuyển giữa các ô OTP khi người dùng nhập
function checkVerifyOTP() {
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
function resendOtp() {
  alert('Mã OTP đã được gửi lại!')
}

// Hàm xác nhận mã OTP
function verifyOtp() {
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

function sidebarMobile() {
  const sidebar = document.getElementById('sidebarTranslate')
  const sidebars = document.getElementById('Sidebar')
  const btn = document.getElementById('btnSidebar')
  const btnClose = document.getElementById('btnSidebar-mb')

  if (screen.width < 1280) {
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('is-open')

      if (sidebar.classList.contains('is-open')) {
        sidebars.classList.add('is-overlay')
      } else {
        sidebars.classList.remove('is-overlay')
      }
    })

    btnClose.addEventListener('click', () => {
      sidebar.classList.remove('is-open')
      sidebars.classList.remove('is-overlay')
    })
  }
}

function toggleMobile() {
  if (screen.width >= 1280) {
    const btn = document.getElementById('btnSidebar')
    const layout = document.getElementById('RootLayout')
    const sidebar = document.getElementById('Sidebar')

    btn.addEventListener('click', () => {
      if (sidebar.classList.contains('isTranslate')) {
        layout.style.marginLeft = sidebar.offsetWidth + 24 + 'px'
        layout.style.transition = 'margin .2s'
        sidebar.style.transform = 'translateX(0%)'
        sidebar.style.transition = 'transform .2s'
        sidebar.classList.remove('isTranslate')
      } else {
        layout.style.marginLeft = 0
        layout.style.transition = 'margin .2s'
        sidebar.style.transform = 'translateX(-150%)'
        sidebar.style.transition = 'transform .2s'
        sidebar.classList.add('isTranslate')
      }
    })
  }
}

function collapsedFilter() {
  const btnCollapse = document.getElementById('collapseFilter')
  const blockCollapse = document.getElementById('toggleCollapseFilter')
  const optinal = document.querySelectorAll('.onOptinal')

  if (btnCollapse) {
    btnCollapse.addEventListener('click', () => {
      console.log('object')
      optinal.forEach((item) => {
        if (item.style.display === 'none') {
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      })
    })
  }
}

function croppedimage() {
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

    $('#price-slider').on('touchstart touchmove', function (e) {
      e.preventDefault()
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

      // When "Tất cả" is selected, select all options
      $('#' + name + '.block-selector').on('select2:select', function (e) {
        const selectElement = $(this) // Lấy đối tượng dropdown hiện tại
        const selectedId = e.params.data.id // Lấy id của tùy chọn vừa được chọn

        if (selectedId === 'all') {
          // Chọn tất cả các tùy chọn (trừ tùy chọn "Tất cả")
          selectElement
            .find('option')
            .not('[value="all"]')
            .prop('selected', true)
          selectElement.trigger('change') // Kích hoạt sự kiện change để Select2 cập nhật giao diện
          $('.select2-results__option').addClass(
            'select2-results__option--selected',
          )
        }
      })

      $('#' + name + '.block-selector').on('select2:unselect', function (e) {
        const selectElement = $(this) // Lấy đối tượng dropdown hiện tại
        const unselectedId = e.params.data.id // Lấy id của tùy chọn vừa bị bỏ chọn

        if (unselectedId === 'all') {
          // Bỏ chọn tất cả các tùy chọn (trừ tùy chọn "Tất cả")
          selectElement
            .find('option')
            .not('[value="all"]')
            .prop('selected', false)
          selectElement.trigger('change') // Kích hoạt sự kiện change để Select2 cập nhật giao diện
          $('.select2-results__option').removeClass(
            'select2-results__option--selected',
          )
        } else {
          selectElement.find('option[value="all"]').prop('selected', false)
          selectElement.trigger('change') // Kích hoạt sự kiện change để Select2 cập nhật giao diện
          $('.select2-results__option')
            .first()
            .removeClass('select2-results__option--selected')
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

    if ($('.block-selector') && $('.block-selector').length > 0) {
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
    }

    if ($('.block-selector-admin') && $('.block-selector-admin').length > 0) {
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
    }

    if ($('#filters') && $('#filters').length > 0) {
      $('#filters').select2({
        placeholder: dataAttr,
        minimumResultsForSearch: Infinity,
        closeOnSelect: false,
        // allowClear: true,
        templateResult: formatOption,
        templateSelection: formatSelection,
      })
    }
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

  if (btn) {
    btn.addEventListener('click', () => {
      console.log('object')
      if (dropdown.style.display == 'none') {
        dropdown.style.display = 'block'
      } else {
        dropdown.style.display = 'none'
      }
    })

    // Đóng dropdown khi click ra ngoài
    document.addEventListener('click', (e) => {
      // Kiểm tra xem click có xảy ra bên ngoài btn và dropdown hay không
      if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none'
      }
    })

    // Khi checkbox "Chọn tất cả" thay đổi
    $('#checkedAllFilter').on('change', function () {
      // Lấy trạng thái checked của checkbox "Chọn tất cả"
      let isChecked = $(this).is(':checked')

      // Áp dụng trạng thái cho tất cả các checkbox con
      $('.item')
        .not('.item-checked-all')
        .find('input[type="checkbox"]')
        .prop('checked', isChecked)
    })

    // Khi bất kỳ checkbox con nào thay đổi
    $('.item')
      .not('.item-checked-all')
      .find('input[type="checkbox"]')
      .on('change', function () {
        // Đếm tổng số checkbox con (trừ checkbox "Chọn tất cả")
        let totalCheckboxes = $('.item')
          .not('.item-checked-all')
          .find('input[type="checkbox"]').length
        // Đếm số checkbox con đang được checked
        let checkedCheckboxes = $('.item')
          .not('.item-checked-all')
          .find('input[type="checkbox"]:checked').length

        // Cập nhật trạng thái của checkbox "Chọn tất cả"
        if (checkedCheckboxes === totalCheckboxes) {
          // Nếu tất cả checkbox con được chọn
          $('#checkedAllFilter').prop('checked', true)
          $('#checkedAllFilter')[0].indeterminate = false
        } else if (checkedCheckboxes === 0) {
          // Nếu không có checkbox con nào được chọn
          $('#checkedAllFilter').prop('checked', false)
          $('#checkedAllFilter')[0].indeterminate = false
        } else {
          // Nếu chỉ một số checkbox con được chọn
          $('#checkedAllFilter').prop('checked', false)
          $('#checkedAllFilter')[0].indeterminate = true
        }
      })
  }
}

function fileDropzone() {
  if ($('.dropzone') && $('.dropzone').length > 0) {
    Dropzone.options.myDropzone = {
      url: '/upload', // URL to which files will be uploaded
      autoProcessQueue: false, // Prevent Dropzone from uploading automatically
      addRemoveLinks: true, // Allow removal of files
      maxFiles: 1, // Maximum number of files
      maxFilesize: 1,
      acceptedFiles: 'image/*,application/pdf,.docx', // Allowed file types
      init: function () {
        var myDropzone = this

        // Handle the upload button click
        document
          .getElementById('uploadBtn')
          .addEventListener('click', function () {
            console.log('object')
            myDropzone.processQueue() // Process the queue to upload files
          })

        // When the modal is closed, clear the Dropzone queue
        $('#modalImportFile').on('hidden.bs.modal', function () {
          myDropzone.removeAllFiles() // Clear all files in the Dropzone
          console.log('object')
        })
      },
    }
  }
}

function tableMagic() {
  if ($('#tableMagic') && $('#tableMagic').length > 0) {
    const headerCells = document.querySelectorAll('.header .cell')
    const bodyRows = document.querySelectorAll('.table-item')
    const allRows = [document.querySelector('.header'), ...bodyRows]

    // Tính toán độ rộng tối đa của từng cột
    const columnWidths = Array.from(headerCells).map((cell) => cell.scrollWidth)

    allRows.forEach((row) => {
      const cells = row.querySelectorAll('.cell')
      cells.forEach((cell, index) => {
        const contentWidth = cell.scrollWidth
        if (contentWidth > columnWidths[index]) {
          columnWidths[index] = contentWidth
        }
      })
    })

    // Áp dụng độ rộng cho tất cả các cột
    allRows.forEach((row) => {
      const cells = row.querySelectorAll('.cell')
      cells.forEach((cell, index) => {
        cell.style.flex = `0 0 ${columnWidths[index]}px`
        cell.style.minWidth = `${columnWidths[index]}px`
      })
    })
  }
}

function tbDropdown() {
  const tbBtn = document.querySelectorAll('.tb-dropdown-button')
  const tbMenu = document.querySelectorAll('.tb-dropdown-menu')

  tbBtn.forEach((item, id) => {
    item.addEventListener('click', () => {
      const siblings = item.nextElementSibling

      tbMenu.forEach((content) => {
        content.style.display = 'none'
      })

      if (siblings.style.display == 'none') {
        siblings.style.display = 'block'
      } else {
        siblings.style.display = 'none'
      }
    })
  })

  // Đóng dropdown khi click bên ngoài
  document.addEventListener('click', (e) => {
    const isClickInside =
      Array.from(tbBtn).some((btn) => btn.contains(e.target)) ||
      Array.from(tbMenu).some((content) => content.contains(e.target))

    if (!isClickInside) {
      tbMenu.forEach((content) => {
        content.style.display = 'none'
      })
    }
  })
}

function mobileDropFilters() {
  const btn = document.getElementById('btnDropFilterLg')
  const drop = document.getElementById('mbDropFilters')

  if (screen.width < 768 && drop) {
    btn.addEventListener('click', () => {
      if (drop.classList.contains('hidden')) {
        drop.classList.remove('hidden')
      } else {
        drop.classList.add('hidden')
      }
    })

    // Đóng dropdown khi click ra ngoài
    document.addEventListener('click', (e) => {
      // Kiểm tra xem click có xảy ra bên ngoài btn và dropdown hay không
      if (!btn.contains(e.target) && !drop.contains(e.target)) {
        drop.classList.add('hidden')
      }
    })
  }
}

function tableTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  )
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
  )
}

$(window).bind('load', function () {
  inputTogglePassword()
  checkVerifyOTP()
  sidebarMobile()
  toggleMobile()
  collapsedFilter()
  mobileDropFilters()
  tableMagic()
  tableTooltips()
  tbDropdown()
  croppedimage()
  checkSidebar()
  toggleMenuDropdown()
  toggleDropdownFilter()
  fileDropzone()
  filterTable()
})
