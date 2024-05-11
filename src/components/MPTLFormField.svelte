<script lang="ts">
  export let label: string;
  export let value: any = '';
  export let helper: string = '';
  export let type: string = 'text';
  export let placeholder: string = helper || label; // For accessibility

  const handleInput = (e: any) => {
    value = type.match(/^(number|range)$/)
      ? +e.target.value
      : e.target.value;
  };
</script>

<label class="ms-form-field">
  {#if label}
    <span class="ms-form-field__label">{ label }</span>
  {/if}
  <input {type} on:input={handleInput} class="ms-form-field__input" placeholder={placeholder} name="text-field" {value} />
  {#if helper}
    <span class="ms-form-field__helper">{ helper }</span>
  {/if}
</label>