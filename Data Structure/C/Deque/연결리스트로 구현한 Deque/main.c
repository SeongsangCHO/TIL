/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:44:19 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 20:39:20 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

int main(void)
{
	t_queue *queue;

	queue = init();
	enQueue(queue, 1);
	enQueue(queue, 2);
	enQueue(queue, 3);
	enQueue_rear(queue, 4);
	print_deque(queue);
	printf(" * * * * * deQueue_front * * * * * \n");
	deQueue(queue);
	print_deque(queue);
	printf(" * * * * * deQueue_rear * * * * * \n");
	deQueue_rear(queue);
	print_deque(queue);
	return (0);
}
