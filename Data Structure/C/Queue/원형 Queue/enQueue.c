/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   enQueue.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/27 15:39:19 by secho             #+#    #+#             */
/*   Updated: 2020/04/27 18:01:32 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

void	enQueue(t_queue *queue, int value)
{
	if(queue == NULL || queue->rear < -1 ||
			(queue->rear + 1)/queue->max_size == queue->front)
		return ;
	queue->rear = (queue->rear + 1) % queue->max_size;
	queue->data[queue->rear] = value;
	return ;
}
