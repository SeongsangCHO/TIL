/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/27 15:38:09 by secho             #+#    #+#             */
/*   Updated: 2020/04/27 16:02:15 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

int main(void)
{
	t_queue *queue;

	queue = init();
	enQueue(queue, 1);
	enQueue(queue, 2);
	enQueue(queue, 3);
	enQueue(queue, 4);
	deQueue(queue);
	printf("data=%d\n",queue->data[queue->rear]);
	return (0);
}
