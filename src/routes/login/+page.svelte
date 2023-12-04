<script>

    import { enhance } from "$app/forms";

</script>
<h1>Log in</h1>

<form method="POST" use:enhance>
    <input type="text" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    <button>Log In</button>
</form>