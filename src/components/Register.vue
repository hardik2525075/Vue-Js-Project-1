<template>
  <v-container class="container" fill-height>
    <v-row class="text-center" justify="center">
      <v-col
        cols="12"
        sm="5"
        md="5"
        lg="3"
      >
        <v-card elevation="3" outlined style="padding: 20px">
          <v-img
            :src="require('../assets/logo.svg')"
            class="my-3"
            contain
            height="80"
          />
          <h2>Register</h2>
          <!-- Validation Form -->
          <validation-observer ref="observer">
            <form @submit.prevent="submit">
              <!-- Name -->
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|max:10"
              >
                <v-text-field
                  v-model="name"
                  :counter="10"
                  :error-messages="errors"
                  label="Name"
                  required
                ></v-text-field>
              </validation-provider>
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
                rules="required|max:12"
              >
                <v-text-field
                  v-model="password"
                  :counter="12"
                  :error-messages="errors"
                  label="Password"
                  required
                ></v-text-field>
              </validation-provider>
              <!-- Checkbox -->
              <v-checkbox
                v-model="checkbox"
                label="Keep me signed in"
                color="dark"
                value="dark"
                hide-details
                style="font-weight: bold"
                class="mb-5"
              ></v-checkbox>

              <v-btn
                color="primary"
                depressed
                elevation="2"
                type="submit"
              >
                Register
              </v-btn>
            </form>
          </validation-observer>
          <v-main style="padding-top: 15px">
            <router-link to="/login"> Return to login </router-link>
          </v-main>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import axios from "axios";
import { RouteEnum } from "../router/routeEnum";
import { useToastr } from "./toastr";

const toastr = useToastr();

setInteractionMode("eager");

extend("password", {
  ...digits,
  message: "{field} needs to be {length} digits. ({value})",
});

extend("required", {
  ...required,
  message: "{field} can not be empty",
});

extend("max", {
  ...max,
  message: "{field} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{field} {value} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
    name:"RigisterPage",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    checkbox: true,
  }),

  methods: {
    async submit() {
      this.$refs.observer.validate();
      try {
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        const result = await axios.post(
          "http://restapi.adequateshop.com/api/authaccount/registration",
          payload
        );
        if(result.data.code === 1) return toastr.error(result.data.message);
        toastr.success(result.data.message);
        console.log(result);
        this.$router.push(RouteEnum.LOGIN);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>