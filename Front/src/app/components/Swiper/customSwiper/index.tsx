import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { CustomSwiperProps } from './type';

export default function CustomSwiper({
	children,
	swiperId,
}: CustomSwiperProps) {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar]}
			spaceBetween={10}
			slidesPerView={1}
			navigation={{
				prevEl: `.swiper-button-prev-${swiperId}`,
				nextEl: `.swiper-button-next-${swiperId}`,
			}}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 25,
				},
				820: {
					slidesPerView: 3,
					spaceBetween: 30,
				},
				1090: {
					slidesPerView: 4,
					spaceBetween: 40,
				},
				1280: {
					slidesPerView: 4.5,
					spaceBetween: 45,
				},
				1680: {
					slidesPerView: 5,
					spaceBetween: 50,
				},
				1980: {
					slidesPerView: 6,
					spaceBetween: 50,
				},
			}}
		>
			{children}
		</Swiper>
	);
}
