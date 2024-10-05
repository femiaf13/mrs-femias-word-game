<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from "vue";
import {onClickOutside} from '@vueuse/core'

const props = defineProps({
  isOpen: Boolean,
});

let newAnswer = ref("")

const url = window.location.hostname

const computedUrl = computed(() => {
  return `?${btoa(newAnswer.value)}`
})

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, ()=>emit('modal-close'))

</script>

<template>
  <div v-show="isOpen" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header"> Use your own 5 letter word!</slot>
        </div>
        <div class="modal-body">
          <input v-model="newAnswer" type="text" id="newgame" maxlength="5" onkeydown="return /[a-z]/i.test(event.key)">
          <p v-if="newAnswer.length == 5">{{ computedUrl }}</p>
          <a v-if="newAnswer.length == 5" :href="computedUrl" target="_top">{{ computedUrl }}</a>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button @click.stop="emit('modal-close')">Close</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

</style>