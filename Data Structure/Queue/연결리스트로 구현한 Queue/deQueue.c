/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deQueue.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:16:34 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:38:27 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

void		deQueue(t_queue *queue)
{
	t_node *new;

	if(queue == NULL || queue->size == 0)
		return ;
	new = queue->front;
	queue->front = new->next;
	free(new);
	queue->size--;
}
