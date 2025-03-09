<template>
  <!-- Your Data Grid container -->
  <div id="magicTable" style="height: 500px"></div>
</template>

<script>
export default {
  mounted() {
    // Grid API: Access to Grid API methods
    let gridApi
    // Grid Options: Contains all of the Data Grid configurations
    const gridOptions = {
      localeText: {
        // Phân trang
        page: 'Trang',
        more: 'Thêm',
        to: 'đến',
        of: 'của',
        next: 'Tiếp theo',
        last: 'Cuối',
        first: 'Đầu tiên',
        previous: 'Trước',

        // Tải dữ liệu
        loadingOoo: 'Đang tải dữ liệu...',

        // Bộ lọc header
        selectAll: 'Chọn tất cả',
        searchOoo: 'Tìm kiếm...',
        blanks: 'Trống',

        // Bộ lọc số
        equals: 'Bằng',
        notEqual: 'Không bằng',
        lessThan: 'Nhỏ hơn',
        greaterThan: 'Lớn hơn',
        lessThanOrEqual: 'Nhỏ hơn hoặc bằng',
        greaterThanOrEqual: 'Lớn hơn hoặc bằng',

        // Bộ lọc text
        contains: 'Chứa',
        notContains: 'Không chứa',
        startsWith: 'Bắt đầu với',
        endsWith: 'Kết thúc với',

        // Nhóm (Group Panel)
        group: 'Nhóm',
        columns: 'Cột',
        pivotMode: 'Chế độ Pivot',
        valueAggregation: 'Tổng hợp giá trị',
        pivotColumnGroupTotals: 'Tổng nhóm cột Pivot',
        groupColumn: 'Cột nhóm',

        // Các hàm tổng hợp
        aggFuncNone: 'Không',
        aggFuncSum: 'Tổng',
        aggFuncCount: 'Đếm',
        aggFuncAvg: 'Trung bình',
        aggFuncMin: 'Nhỏ nhất',
        aggFuncMax: 'Lớn nhất',
        aggFuncFirst: 'Đầu tiên',
        aggFuncLast: 'Cuối cùng',

        // Khi không có dữ liệu
        noRowsToShow: 'Không có dữ liệu',

        // Panel công cụ (Tool Panel)
        pinColumn: 'Ghim cột',
        valueColumns: 'Cột giá trị',
        autosizeThisColumn: 'Tự động điều chỉnh cột',
        autosizeAllColumns: 'Tự động điều chỉnh tất cả cột',
        chooseColumns: 'ádasda',
        groupBy: 'Nhóm theo',
        resetColumns: 'Thiết lập lại cột',
        expandAll: 'Mở rộng tất cả',
        collapseAll: 'Thu gọn tất cả',
        copy: 'Sao chép',
        copyWithHeaders: 'Sao chép có bao gồm tiêu đề',
        ctrlC: 'Ctrl+C',
        paste: 'Dán',

        // Row Group Panel
        rowGroupPanelEmptyMessage: 'Kéo cột vào đây để nhóm',
      },
      // Row Data: The data to be displayed.
      rowData: [
        {
          athlete: 'Michael Phelps',
          age: 23,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 8,
          silver: 0,
          bronze: 0,
          total: 8,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Michael Phelps',
          age: 19,
          country: 'United States',
          year: 2004,
          date: '29/08/2004',
          sport: 'Swimming',
          gold: 6,
          silver: 0,
          bronze: 2,
          total: 8,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Michael Phelps',
          age: 27,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 4,
          silver: 2,
          bronze: 0,
          total: 6,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Natalie Coughlin',
          age: 25,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 1,
          silver: 2,
          bronze: 3,
          total: 6,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Aleksey Nemov',
          age: 24,
          country: 'Russia',
          year: 2000,
          date: '01/10/2000',
          sport: 'Gymnastics',
          gold: 2,
          silver: 1,
          bronze: 3,
          total: 6,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Alicia Coutts',
          age: 24,
          country: 'Australia',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 1,
          silver: 3,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Missy Franklin',
          age: 17,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 4,
          silver: 0,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Ryan Lochte',
          age: 27,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 2,
          silver: 2,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Allison Schmitt',
          age: 22,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 3,
          silver: 1,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Natalie Coughlin',
          age: 21,
          country: 'United States',
          year: 2004,
          date: '29/08/2004',
          sport: 'Swimming',
          gold: 2,
          silver: 2,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Michael Phelps',
          age: 23,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 8,
          silver: 0,
          bronze: 0,
          total: 8,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Michael Phelps',
          age: 19,
          country: 'United States',
          year: 2004,
          date: '29/08/2004',
          sport: 'Swimming',
          gold: 6,
          silver: 0,
          bronze: 2,
          total: 8,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Michael Phelps',
          age: 27,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 4,
          silver: 2,
          bronze: 0,
          total: 6,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Natalie Coughlin',
          age: 25,
          country: 'United States',
          year: 2008,
          date: '24/08/2008',
          sport: 'Swimming',
          gold: 1,
          silver: 2,
          bronze: 3,
          total: 6,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Aleksey Nemov',
          age: 24,
          country: 'Russia',
          year: 2000,
          date: '01/10/2000',
          sport: 'Gymnastics',
          gold: 2,
          silver: 1,
          bronze: 3,
          total: 6,
          link: 'https://www.microsoft.com/',
        },
        {
          athlete: 'Alicia Coutts',
          age: 24,
          country: 'Australia',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 1,
          silver: 3,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Missy Franklin',
          age: 17,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 4,
          silver: 0,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Ryan Lochte',
          age: 27,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 2,
          silver: 2,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Allison Schmitt',
          age: 22,
          country: 'United States',
          year: 2012,
          date: '12/08/2012',
          sport: 'Swimming',
          gold: 3,
          silver: 1,
          bronze: 1,
          total: 5,
        },
        {
          athlete: 'Natalie Coughlin',
          age: 21,
          country: 'United States',
          year: 2004,
          date: '29/08/2004',
          sport: 'Swimming',
          gold: 2,
          silver: 2,
          bronze: 1,
          total: 5,
        },
      ],
      // Column Definitions: Defines the columns to be displayed.
      columnDefs: [
        { field: 'athlete', cellClass: colorCellClass },
        { field: 'age', filter: 'agSetColumnFilter', maxWidth: 300 },
        {
          field: 'date',
          filter: 'agDateColumnFilter',
        },
        { field: 'country', filter: 'agSetColumnFilter' },
        { field: 'sport', filter: 'agMultiColumnFilter' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: false },
        { field: 'link', cellRenderer: CompanyRenderer },
        {
          headerName: 'Hành động',
          field: 'actions',
          cellRenderer: actionCellRenderer,
        },
      ],
      defaultColDef: {
        flex: screen.width >= 1280 ? 1 : 'auto',
        editable: true,
        // maxWidth: 150,
      },
      editType: 'fullRow',
    }

    function actionCellRenderer(params) {
      // Tạo container
      const container = document.createElement('div')
      container.style.display = 'flex'
      container.style.gap = '4px'

      // Nút Edit
      const editBtn = document.createElement('button')
      editBtn.innerText = 'edit'
      editBtn.classList.add('edit-btn')
      editBtn.addEventListener('click', () => {
        // Bắt đầu chỉnh sửa inline cột "athlete" (hoặc cột khác) của row
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          colKey: 'athlete',
        })
      })

      // Nút Delete
      const deleteBtn = document.createElement('button')
      deleteBtn.innerText = 'delete'
      deleteBtn.classList.add('delete-btn')
      deleteBtn.addEventListener('click', () => {
        // Xóa dòng khỏi dữ liệu
        // applyTransaction({ remove: [...] }) sẽ xóa row khỏi grid
        params.api.applyTransaction({ remove: [params.node.data] })
      })

      container.appendChild(editBtn)
      container.appendChild(deleteBtn)

      return container
    }

    // func render link single user
    function CompanyRenderer(params) {
      const link = `<a href="${params.value}" target="_blank">Link</a>`
      return link
    }

    // func check color name single user
    var colorClasses = [
      'rag-green',
      'rag-blue',
      'rag-red',
      'rag-yellow',
      'rag-purple',
    ]
    var nameColorMap = {}
    var colorIndex = 0
    function colorCellClass(params) {
      let val = params.value
      if (!val) return null // nếu ô trống, không tô màu

      // Nếu chưa có tên này trong map, gán màu mới
      if (!nameColorMap[val]) {
        // Lấy màu theo chỉ số colorIndex, sau đó tăng lên
        nameColorMap[val] = colorClasses[colorIndex % colorClasses.length]
        colorIndex++
      }
      // Trả về class màu đã gán
      return nameColorMap[val]
    }

    // Your Javascript code to create the Data Grid
    const myGridElement = document.querySelector('#magicTable')
    agGrid.createGrid(myGridElement, gridOptions)
  },
}
</script>
