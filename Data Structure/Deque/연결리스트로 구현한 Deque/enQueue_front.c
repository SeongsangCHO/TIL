/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enQueue.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:02:44 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 19:55:59 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

void	enQueue(t_queue *queue, int value)
{
	t_node *new;

	if(queue == NULL || queue->size <= -1 || (!(new = create_node(value))))
		return ;
	new->next = queue->front;
	if(queue->size == 0)
		queue->rear = new;
	else
		queue->front->prev = new;
	queue->front = new;
	queue->size++;
	return ;
}
