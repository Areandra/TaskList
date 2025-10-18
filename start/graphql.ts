import graphql from '@foadonis/graphql/services/main'

graphql.resolvers([
  () => import('#graphql/resolvers/users_resolvers'),
  () => import('#graphql/resolvers/fasilitas_resolver'),
  () => import('#graphql/resolvers/bookings_resolvers')
])