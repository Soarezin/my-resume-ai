<template>
  <div class="bg-white overflow-hidden shadow-soft rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-5 sm:px-6" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
    <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template> 