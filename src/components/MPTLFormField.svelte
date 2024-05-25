<script lang="ts">
  export let label: string;
  export let value: any = '';
  export let helper: string = '';
  export let type: string = 'text';
  export let placeholder: string = helper || label;
  export let name: string = '';
  export let required: boolean = false;
  export let readonly: boolean = false;
  export let disabled: boolean = false;

  const onInput = (e: any) => (value = e.target.value);
</script>

<label class="ms-form-field">
  {#if label}
    <span class="ms-form-field__label">{ label }</span>
  {/if}
  <input
    {type}
    class="ms-form-field__input"
    {placeholder}
    {name}
    {value}
    {required}
    {readonly}
    {disabled}
    on:input={onInput}
  />
  {#if helper}
    <span class="ms-form-field__helper">{ helper }</span>
  {/if}
</label>