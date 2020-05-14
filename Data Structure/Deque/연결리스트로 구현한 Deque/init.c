/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/28 19:00:14 by secho             #+#    #+#             */
/*   Updated: 2020/04/28 19:01:10 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "deque.h"

t_queue *init(void)
{
	t_queue *queue;

	if(!(queue = malloc(sizeof(t_queue))))
		return (NULL);
	queue->front = NULL;
	queue->rear = NULL;
	queue->size = 0;
	return (queue);
}
