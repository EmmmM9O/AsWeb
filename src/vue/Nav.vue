<script lang="ts">
import { defineComponent, readonly } from 'vue';
interface Page{
    readonly name:String,
    readonly url:String
}
export default defineComponent({
    props:{
        PageList:Array<Page>
    }
});
</script>
