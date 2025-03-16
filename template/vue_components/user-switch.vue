<template>
  <div id="userDropdown" class="relative mb-5">
    <div class="flex flex-wrap items-center gap-2">
      <button type="button" id="btnSidebar">
        <img src="images/asset/material-symbols_menu-rounded.png" alt="" />
      </button>

      <!-- thay 3F8CFE => 363636 nếu là trường hợp text đen -->
      <h2 class="!text-[#3F8CFE] !text-[16px] !font-bold !uppercase !m-0 !ms-4">
        vinhomes ocean park 2
      </h2>

      <div class="ms-auto inline-flex items-center gap-6">
        <button
          type="button"
          id="headBtnSetting"
          class="head-btn-setting !w-[36px] !h-[36px] !rounded-[8px] !bg-white !p-2.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M16 9.41177H13.9482C13.7882 10.0706 13.5341 10.6824 13.1859 11.2282L14.6353 12.6776L12.6588 14.6541L11.2094 13.2047C10.6635 13.5435 10.0518 13.7976 9.41177 13.9482V16H6.58824V13.9482C5.94824 13.7976 5.33647 13.5435 4.79059 13.2047L3.34118 14.6541L1.34588 12.6588L2.79529 11.2094C2.45647 10.6635 2.20235 10.0518 2.05176 9.41177H0V6.61647H2.04235C2.19294 5.95765 2.45647 5.34588 2.79529 4.79059L1.34588 3.34118L3.32235 1.36471L4.77176 2.81412C5.31765 2.46588 5.93882 2.21176 6.58824 2.05176V0H9.41177V2.05176C10.0518 2.20235 10.6635 2.45647 11.2094 2.79529L12.6588 1.34588L14.6541 3.34118L13.2047 4.79059C13.5435 5.34588 13.8071 5.95765 13.9576 6.61647H16V9.41177ZM8 10.8235C9.56235 10.8235 10.8235 9.56235 10.8235 8C10.8235 6.43765 9.56235 5.17647 8 5.17647C6.43765 5.17647 5.17647 6.43765 5.17647 8C5.17647 9.56235 6.43765 10.8235 8 10.8235Z"
              fill="#3F8CFE"
            />
          </svg>
        </button>

        <button
          type="button"
          id="tippyUserDropdown"
          class="inline-flex !gap-2 items-center bg-white !rounded-[8px] p-1"
        >
          <img
            class="w-[30px] h-[30px] rounded-[8px] border border-solid border-[#f4f9fd] object-cover flex-shrink-0"
            src="images/asset/sm-ava.png"
            alt=""
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 10L12 14L8 10H16Z"
              fill="#3F8CFE"
              stroke="#3F8CFE"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div id="tippyHTMLUser" style="display: none">
          <div class="tippy-user-list">
            <a href="" title=""> Thông tin cá nhân </a>
            <a href="" title=""> Thoát </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const template = document.getElementById('tippyHTMLUser')

    tippy('#tippyUserDropdown', {
      content: template.innerHTML,
      trigger: 'click',
      hideOnClick: true,
      interactive: true,
      theme: 'light',
      allowHTML: true,
    })
  },
}
</script>
