<template>
  <v-container class="container" fill-height>
    <v-row class="text-center" justify="center">
      <v-col cols="12" sm="5" md="5" lg="4">
        <v-card elevation="3" outlined style="padding: 20px">
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="80"
          />
          <h2>Login</h2>
          <!-- Validation Form -->
          <validation-observer ref="observer">
            <form @submit.prevent="submit">
              <!-- Email -->
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="E-mail"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- Password -->
              <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required|min:6|max:12"
              >
                <v-text-field
                  v-model="password"
                  :counter="12"
                  :error-messages="errors"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </validation-provider>

              <v-btn color="primary" depressed elevation="2" type="submit">
                Login
              </v-btn>
            </form>
          </validation-observer>

          <v-main style="padding-top: 15px">
            <router-link to="/register"> Register account </router-link>
          </v-main>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import {
  required,
  digits,
  email,
  min,
  max,
  regex,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
// import axios from "axios";
import { RouteEnum } from "../router/routeEnum";
import { useToastr } from "./toastr";
import { APIService } from "../services";

const toastr = useToastr();

setInteractionMode("eager");

extend("password", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("min", {
  ...min,
  message: "{_field_} should be greater than {length} characters",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "LoginPage",
  data: () => ({
    email: "",
    password: "",
    checkbox: true,
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate();
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };
        const result = await APIService.rawPost("/authaccount/login", payload);
        console.log(result);
        if (result.data.code === 1) return toastr.error(result.data.message);
        // Set local storage... 
        localStorage.setItem("user",  JSON.stringify(result.data.data));

        toastr.success(result.data.message);
        this.$router.push(RouteEnum.HOME);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

// email: test122333@gmail.com
// password: 123456