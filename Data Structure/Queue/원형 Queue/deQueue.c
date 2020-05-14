/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deQueue.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/27 15:42:30 by secho             #+#    #+#             */
/*   Updated: 2020/04/27 18:00:31 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

void	deQueue(t_queue *queue)
{
	if(queue == NULL || queue->rear == queue->front)
		return;
	queue->front = (queue->front + 1) % queue->max_size;
	return ;
}
