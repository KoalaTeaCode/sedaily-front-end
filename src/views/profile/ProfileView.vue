<template>
  <div>
    <div v-if="loading" class="center">
      <spinner :show="loading"></spinner>
    </div>
    <div v-else-if="error" class="bg-danger">
      Error: {{ error }}
    </div>
    <div v-else>

      <profile-details
        :userData="me"
        :ownProfile="true" />

      <div class="row">
        <div class="profile-item col-md-8">
          <profile-activities
            :userData="me"
            :activities="activities"
            :activityDays="activityDays" />
        </div>

        <div class="profile-item col-md-4">
          <profile-topics v-if="me" :user="me" />
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapState } from 'vuex'
import ProfileDetails from '@/components/profile/ProfileDetails'
import ProfileActivities from './ProfileActivities'
import ProfileTopics from './ProfileTopics'
import Spinner from '@/components/Spinner'

export default {
  name: 'profile-view',

  components: {
    ProfileDetails,
    ProfileActivities,
    ProfileTopics,
    Spinner
  },

  data () {
    return {
      loading: false,
      error: null,
      badges: null,
      activities: null,
      activityDays: 0
    }
  },

  computed: {
    ...mapState({
      me (state) {
        return state.me
      },
      alreadySubscribed (state) {
        return (
          state.me &&
          state.me.subscription &&
          state.me.subscription.active
        )
      },
    }),
  },

  watch: {
    me (newData) {
      if (newData && newData._id) this.fetchData()
    }
  },

  mounted () {
    this.fetchData()
  },

  methods: {
    ...mapActions([
      'fetchPublicActivities',
    ]),

    async fetchData () {
      if (!this.me || !this.me._id) {
        return;
      }

      this.loading = true

      try {
        const response = await this.fetchPublicActivities({ userId: this.me._id })

        if (response.data) {
           this.activities = response.data.activities
           this.badges = response.data.badges || []
           this.activityDays = response.data.activityDays
        }
      }
      catch (error) {
        this.error = error.response.data.message
      }
      finally {
        this.loading = false
      }
    }
  },
}
</script>
<style lang="stylus">
@import '../../css/variables'

.center
  text-align center
  margin 5vh 0

.bg-danger
  text-align center
  color #ffffff
  padding 10px
  font-size 16px
  font-weight 600

</style>
