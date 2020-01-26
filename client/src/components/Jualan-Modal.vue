<template>
  <b-modal
    id="jualan-modal"
    size="xl"
    title="Tambah barang jual"
    hide-footer
    no-close-on-esc
    no-close-on-backdrop
    centered
  >
    <JualanForm></JualanForm>
  </b-modal>
</template>

<script>
import JualanModalForm from '../components/Jual/Jualan-Modal-Form'
export default {
  name: 'JualanModal',
  components: {
    JualanForm: JualanModalForm
  }
}
</script>

<style></style>
