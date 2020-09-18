/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enQueue_rear.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:56:05 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 20:29:19 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

void	enQueue_rear(t_queue *queue, int value)
{
	t_node *new;

	if(queue == NULL || queue->size <= -1 || !(new = create_node(value)))
		return ;
	new->prev = queue->rear;
	if(queue->size == 0)
		queue->front = new;
	else
		queue->rear->next = new;
	queue->rear = new;
	queue->size++;
	return ;
}
