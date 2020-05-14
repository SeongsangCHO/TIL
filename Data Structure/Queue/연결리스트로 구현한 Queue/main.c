/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:20:59 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:26:49 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

int main(void)
{
	t_queue *queue;

	queue = init_queue();
	enQueue(queue, 1);
	enQueue(queue, 2);
	enQueue(queue, 3);
	enQueue(queue, 4);
	enQueue(queue, 5);
	print_queue(queue);

	deQueue(queue);
	print_queue(queue);
}
