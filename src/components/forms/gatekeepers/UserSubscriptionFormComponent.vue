<template>
  <div
    class="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5"
  >
    <div
      class="w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden"
      style="max-width: 700px"
    >
      <div
        class="bg-indigo-600 w-full py-5 px-6 text-3xl text-white font-thin text-center"
      >
        Login to your account
      </div>

      <div class="container bg-white p-6 rounded-xl">
        <form class="space-y-4">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-2"
              >Your email</label
            >
            <input
              type="email"
              v-model="email"
              name="email"
              id="email"
              class="w-full p-2 border rounded-md"
              placeholder="name@company.com"
              required
            />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium mb-2"
              >Password</label
            >
            <input
              type="password"
              v-model="password"
              name="password"
              id="password"
              class="w-full p-2 border rounded-md"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="button"
            @click="login"
            class="w-full h-16 text-xl font-light bg-indigo-500 hover:bg-indigo-700 text-white rounded-md"
          >
            Login
          </button>
        </form>

        <p class="text-sm font-light mt-4 text-gray-500">
          Don't have an account?
          <a href="#" class="font-medium text-indigo-600 hover:underline"
            >Register here</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          // User logged in successfully
          alert(data.message);
        } else {
          // Handle errors
          alert(data.error);
        }
      } catch (error) {
        console.error("There was an error logging in the user:", error);
      }
    },
  },
};
</script>

<style></style>
