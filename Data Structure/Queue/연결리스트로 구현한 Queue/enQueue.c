/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enQueue.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:12:53 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:17:21 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

void		enQueue(t_queue *queue, int data)
{
	t_node *new;

	if(queue == NULL || (!(new = create_node(data))))
		return ;
	if(queue->size == 0)
	{
		queue->rear = new;
		queue->front = new;
	}
	else
	{
		queue->rear->next = new;
		queue->rear = new;
	}
	queue->size++;
}
