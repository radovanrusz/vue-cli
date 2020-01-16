<template>
  <div>
    <h1>{{ hlaska }}</h1>
    <h2>{{userDataView}}</h2>
    <h3>{{userStatusView}}</h3>
    <button type="button" @click="logoutClick">Logout user</button>
    <div>
    <multiselect
        v-model="valueKmat" :options="optionsKmat"
        :custom-label="customSelectKmat"
        placeholder=""
        label="title" track-by="title"
        :show-labels="false"
        :allow-empty="false"
        @select="onChangeMultiselect($event, 'kmat')">
        </multiselect>
    </div>
    <div class="form-group">
    <label for="filterMvm2">mvm2:</label>
    <input type="text" class="form-control" id="filterMvm2" v-model="filterMvm2">
  </div>
  <button type="button" @click="confirmFilter">filtrovat</button>
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
// import 'vue-multiselect/dist/vue-multiselect.min.css';
import { namespace } from 'vuex-class';
import { USER } from '../../store/constants';
import { UserData } from '../../store/user/user.types';
import { HttpService } from '../../services/http.service';

const UserStore = namespace(USER);
const journalBaseUrl = process.env.VUE_APP_JOURNAL_URL;
const limit = process.env.VUE_APP_LIMIT;
const httpService = new HttpService();

Vue.component('multiselect', Multiselect);

@Component({
  components: {
    Multiselect
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

  private valueKmat: any = null;

  private optionsKmat: any = [];

  @UserStore.Action logoutUser!: () => void;

  @UserStore.Getter userStatus!: any;

  @UserStore.Getter userData!: any;

  created() {
    // Vue.axios.get('http://localhost:8080/pohyby').then((response) => {
    this.loadJournalItems();
    this.loadJournalFilterItems();

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

  get generateURL(): string {
    let queryString = '';
    if (this.valueKmat && this.valueKmat.title) {
      queryString = `${queryString}kmat=${this.valueKmat.title}&`;
    }
    if (this.filterMvm2) {
      queryString = `${queryString}mvm2=${this.filterMvm2}&`;
    }
    queryString = `${queryString}limit=${limit}&`;
    if (queryString) {
      queryString = `?${queryString}`;
      queryString = queryString.slice(0, -1);
    }
    return `${journalBaseUrl}${queryString}`;
  }

  logoutClick() {
  // this.$store.dispatch("logoutUser");
    this.logoutUser();
  }

  loadJournalItems() {
    httpService.getDirect(this.generateURL).then((response) => {
    // Vue.axios.get(this.generateURL).then((response) => {
      this.items = response.data;
      console.log(this.items);
      debugger;
    });
  }

  loadJournalFilterItems() {
    // Vue.axios.get(process.env.VUE_APP_JOURNAL_INITIAL_FILTERS).then((response) => {
    httpService.getDirect(process.env.VUE_APP_JOURNAL_INITIAL_FILTERS).then((response) => {
      const items:any = [];
      debugger;
      response.data.kmat.forEach((item : String) => {
        items.push({ title: item });
      });
      this.optionsKmat = items;
    });
  }
  //   this.optionsKmat = [
  //     { title: '' },
  //     { title: '11' },
  //     { title: '11114' }
  //   ];
  // }

  confirmFilter() {
    this.loadJournalItems();
  }

  customSelectKmat({ title }: { title: string }): string {
    return title ? `${title}` : '';
  }
}
</script>
