<template>
  <div
    id="Sidebar"
    class="fixed xl:top-6 xl:left-6 max-xl:top-0 max-xl:left-0 z-50 max-w-[240px] h-full xl:h-[calc(100%-48px)]"
  >
    <div
      id="sidebarTranslate"
      class="flex flex-col xl:rounded-[84px] overflow-hidden bg-white h-full"
    >
      <div class="p-[30px_24px_16px]">
        <div class="max-w-full w-full h-auto">
          <a href="" title="">
            <img
              class="w-full h-full object-scale-down"
              src="images/asset/logo.png"
              alt=""
            />
          </a>
        </div>
      </div>

      <div
        class="overflow-bar-custom flex flex-col h-full overflow-auto bg-cover bg-center bg-no-repeat xl:rounded-[12px] p-[70px_0_70px_10px]"
        style="background-image: url('../template/images/asset/bg-sidebar.png')"
      >
        <div class="flex flex-col h-full gap-1">
          <!-- overflow-scroll h-full -->
          <div id="sidebarList" class="sidebar-list pb-10">
            <div class="child" v-for="(item, id) in menuData" :key="id">
              <div class="item">
                <a
                  href=""
                  title=""
                  :class="{ active: id === 0 }"
                  class="link flex items-center !gap-2"
                >
                  <div class="icon !p-2">
                    <img
                      :src="item.icon"
                      alt=""
                      class="w-6 h-6 object-scale-down"
                    />
                  </div>

                  <div class="text grow !text-[16px] font-bold leading-normal">
                    {{ item.title }}
                  </div>
                </a>
              </div>

              <div class="sub" v-if="item.sub">
                <div class="item-sub" v-for="(sub, id) in item.sub" :key="id">
                  <a
                    href=""
                    title=""
                    class="link-sub leading-normal"
                    :class="{ active: id === 0 }"
                  >
                    {{ sub }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="xl:hidden">
      <button
        id="btnSidebar"
        type="button"
        class="absolute top-6 -right-3 z-20 !translate-x-[100%] bg-white !rounded-[8px] inline-flex items-center justify-center w-[40px] h-[40px]"
      >
        <svg
          width="30"
          height="19"
          viewBox="0 0 30 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30 0H0V3H30V0Z" fill="#010002" />
          <path d="M30 8H0V11H30V8Z" fill="#010002" />
          <path d="M30 16H0V19H30V16Z" fill="#010002" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const menuData = reactive([
  {
    icon: 'images/asset/akar-icons_dashboard.svg',
    title: 'Dashboard',
    // sub: ['Vinhomes Ocean Park 2', 'Vinhomes Ocean Park 3'],
  },
  {
    icon: 'images/asset/fluent_table-multiple-20-filled.svg',
    title: 'Bảng hàng',
    sub: ['Vinhomes Ocean Park 2', 'Vinhomes Ocean Park 3'],
  },
  {
    icon: 'images/asset/ix_customer.svg',
    title: 'Khách hàng',
    // sub: ['Vinhomes Ocean Park 2', 'Vinhomes Ocean Park 3'],
  },
  {
    icon: 'images/asset/dashicons_admin-generic.svg',
    title: 'Quản trị',
    // sub: ['Vinhomes Ocean Park 2', 'Vinhomes Ocean Park 3'],
  },
])
</script>

<script>
export default {
  mounted() {
    sidebarMobile()
  },
}
</script>

<style></style>
