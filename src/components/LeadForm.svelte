<script>
import Input from './Input.svelte'  
import ModalLayout from './ModalLayout.svelte'

let inputData = ''
let show

</script>


<ModalLayout bind:show>
  <Input bind:inputData />
  inputData : { inputData }
</ModalLayout>