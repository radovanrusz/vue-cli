<template>
  <div>
    <h1>{{ hlaska }}</h1>
    <h2>{{userDataView}}</h2>
    <h3>{{userStatusView}}</h3>
    <button type="button" @click="logoutClick">Logout user</button>
    <multiselect v-model="value" :options="options"></multiselect>
    <div class="form-group">
    <label for="filterMvm2">mvm2:</label>
    <input type="text" class="form-control" id="filterMvm2" v-model="filterMvm2">
  </div>
  <button type="button" @click="filtrujMvm2">filtrovat</button>
    <table class="table">
      <thead>
      <tr><th>kmat</th><th>mvm1</th><th>mvm2</th><th>hmotnost</th><th>mnozstvi</th></tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in items" v-bind:key="index">
        <td>{{item.kmat}}</td>
        <td>{{item.mvm1}}</td>
        <td>{{item.mvm2}}</td>
        <td>{{item.hmotnost}}</td>
        <td>{{item.mnozstvi}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
// import { UserStatus } from "../store/types";
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { namespace } from 'vuex-class';
import { USER } from '../../store/constants';
import { UserData } from '../../store/user/user.types';

const UserStore = namespace(USER);

Vue.component('multiselect', Multiselect);

@Component({
  components: { Multiselect },
  data() {
    return {
      value: null,
      options: ['list', 'of', 'options']
    };
  },

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

  private filterMvm2: string = '';

  @UserStore.Action logoutUser!: () => void;

  @UserStore.Getter userStatus!: any;

  @UserStore.Getter userData!: any;

  created() {
    Vue.axios.get('https://wmj-ibm-demo-app.trineckezelezarny-15729-56325c34021cf286d0e188cc291cdca2-0001.us-east.containers.appdomain.cloud/journal').then((response) => {
      this.items = response.data;
      console.log(this.items);
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

  filtrujMvm2() {
    Vue.axios.get(`https://wmj-ibm-demo-app.trineckezelezarny-15729-56325c34021cf286d0e188cc291cdca2-0001.us-east.containers.appdomain.cloud/journal?mvm2=${this.filterMvm2}`).then((response) => {
      this.items = response.data;
    });
  }
}
</script>
