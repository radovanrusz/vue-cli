<template>
  <div>
    <h1>{{ hlaska }}</h1>
    <h2>{{userDataView}}</h2>
    <h3>{{userStatusView}}</h3>
    <button type="button" @click="logoutClick">Logout user</button>
    <table class="table">
      <tr v-for="(item,index) in items" v-bind:key="index">
        <td>{{item.kmat}}</td>
        <td>{{item.mvm1}}</td>
        <td>{{item.mvm2}}</td>
        <td>{{item.hmotnost}}</td>
        <td>{{item.mnozstvi}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { UserStatus } from "../store/types";
import { namespace } from 'vuex-class';
import { USER } from '../../store/constants';
import { UserData } from '../../store/user/user.types';

const UserStore = namespace(USER);

@Component({
  components: {},
  props: {
    hlaska: {
      required: false,
      type: String
    }
  }
})

export default class Main extends Vue {
  private hlaska!: string;

  private items: any = [];

  @UserStore.Action logoutUser!: () => void;

  @UserStore.Getter userStatus!: any;

  @UserStore.Getter userData!: any;

  created() {
    Vue.axios.get('https://wmj-ibm-demo-app.trineckezelezarny-15729-56325c34021cf286d0e188cc291cdca2-0001.us-east.containers.appdomain.cloud/journal').then((response) => {
      this.items = response.data;
      debugger;
    });

    // this.items = [
    //   { id: 1, title: "janko" },
    //   { id: 2, title: "juray" },
    //   { id: 3, title: "martin" }
    // ];
  }

  get userStatusView(): any {
    return this.userStatus;
  }

  get userDataView(): string {
    const { id, name, email } = this.userData;
    return `id: ${id} name: ${name} email: ${email}`;
  }

  logoutClick() {
  // this.$store.dispatch("logoutUser");
    this.logoutUser();
  }
}
</script>
