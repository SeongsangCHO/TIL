/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deQueue.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:20:07 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 19:44:07 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

void	deQueue(t_queue *queue)
{
	t_node *tmp;

	if(queue == NULL || queue->size <= -1)
		return ;
	tmp = queue->front;
	queue->front = queue->front->next; 
	if(queue->size == 2)
		queue->rear->prev = NULL;
	free(tmp);
	queue->size--;
}
