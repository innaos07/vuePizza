import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import OrdersView from '@/views/OrdersView.vue';
import ProfileView from '@/views/ProfileView.vue';
import UserView from '@/views/UserView.vue';

export default [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: { layout: 'DefaultLayout' },
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		meta: { layout: 'SimpleLayout' },
	},	{
		path: '/cart',
		name: 'cart',
		component: CartView,
		meta: { layout: 'DefaultLayout' },	
	},	{
		path: '/user',
		name: 'user',
		component: UserView,
		meta: { layout: 'DefaultLayout' },
		children: [
			{
				path: 'profile',
				name: 'profile',
				component: ProfileView,
			},
			{
				path: 'order',
				name: 'order',
				component: OrdersView,
			}
		]
	
	},
]