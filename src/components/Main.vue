<template>
  <div>
    <h1>{{ hlaska }}</h1>
    <h2>{{userDataView}}</h2>
    <h3>{{userStatusView}}</h3>
    <button type="button" @click="logoutClick">Logout user</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserStatus } from "../store/types";

@Component({
  components: {},
  props: {
    hlaska: {
      required: true,
      type: String
    }
  }
})

export default class Main extends Vue {
  private hlaska!: string;

  get userStatusView(): UserStatus {
    return this.$store.getters.userStatus;
  }

  get userDataView(): string {
    const { id, name, email } = this.$store.getters.userData;
    return `id: ${id} name: ${name} email: ${email}`;
  }

  logoutClick() {
    this.$store.dispatch("logoutUser");
  }
}
</script>
