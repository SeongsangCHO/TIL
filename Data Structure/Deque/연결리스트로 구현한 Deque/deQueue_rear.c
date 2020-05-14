/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deQueue_rear.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 20:29:31 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 20:37:34 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

void		deQueue_rear(t_queue *queue)
{
	t_node *tmp;

	if(queue == NULL || queue->size <= 0)
		return ;
	tmp = queue->rear;
	queue->rear = queue->rear->prev;
	if(queue->size == 2)
		queue->front->next = NULL;
	else if(queue->size == 1)
		queue->front = queue->rear;
	queue->rear->next = NULL;
	queue->size--;
	return ;
}
