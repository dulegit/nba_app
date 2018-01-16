const linkStats = 'http://stats.nba.com/stats/drafthistory?LeagueID=00';
const linkPlayer = 'http://stats.nba.com/stats/commonplayerinfo?LeagueID=00&PlayerID=';

const router = new VueRouter({
  routes : [
    { path: '/' },
    { path: '/player' }
  ]
})

Vue.component('link-stats', {
  template: '#link-stats-template'
})

Vue.component('link-player', {
  template: '#link-player-template'
})

Vue.filter('formatDate', value => {
    return value ? moment(String(value)).format('DD/MM/YYYY') : null;
})

new Vue({
  el: "#app",
  data: {
    results: [],
    playerResults: [],
    isPlayer: false,
    isStats: true
  },
  router,
  mounted() {
    axios.get(linkStats).then(response => {
      this.results = response.data.resultSets[0].rowSet;
    })
    .catch(error => {
      console.log(error);
    });
  },
  methods: {
    getPlayerStats: function(event){
      //console.log('event', event);
      let parent = event.target.parentNode;
      let selectedPlayerId = parent.parentNode.firstChild.innerText;

      axios.get(linkPlayer + selectedPlayerId).then(response => {
        this.playerResults = response.data.resultSets[0].rowSet;
        this.isPlayer = true;
        this.isStats = false;
      })
    },
    getLinkStats: function(){
      this.isPlayer = false;
      this.isStats = true;
    }
  },
  computed: {
    getFirst20Results: function() {
      return this.results.slice(0,20);
    },
    getPlayerResults: function() {
      return this.playerResults;
    }
  }
})
